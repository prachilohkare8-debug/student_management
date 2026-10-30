import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import QueryBar from './components/QueryBar';
import Pagination from './components/Pagination';
import DeleteModal from './components/DeleteModal';
import ViewStudentModal from './components/ViewStudentModal';
import AboutModal from './components/AboutModal';
import Notification from './components/Notification';
import { getStudents, deleteStudent } from './services/api';

export default function App() {
  // Navigation State with URL hash sync
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    if (['dashboard', 'students', 'add'].includes(hash)) return hash;
    return 'dashboard';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const setActiveTab = (tab) => {
    window.location.hash = tab;
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state if user clicks browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'students', 'add'].includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Query and Filtering State
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [year, setYear] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; // records per page

  // Data State
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modals State
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Notification Toast State
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Fetch students from backend REST API
  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getStudents({
        search,
        department,
        year,
        sortBy,
        order,
        page: currentPage,
        limit,
      });

      if (res.success) {
        setStudents(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      }
    } catch (err) {
      showNotification(err.message || 'Failed to fetch students from server', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, department, year, sortBy, order, currentPage, limit]);

  // Load students when query parameters or page change
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Reset to page 1 when query filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, department, year, sortBy, order]);

  // Handle Edit Action
  const handleEdit = (student) => {
    setEditingStudent(student);
    setActiveTab('add');
  };

  // Handle View Action
  const handleView = (student) => {
    setViewingStudent(student);
  };

  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setEditingStudent(null);
    setActiveTab('students');
  };

  // Handle Create or Update Success
  const handleFormSuccess = () => {
    setEditingStudent(null);
    setActiveTab('students');
    loadStudents();
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    try {
      setDeleting(true);
      const res = await deleteStudent(studentToDelete._id);
      showNotification(res.message || 'Student deleted successfully from database', 'success');
      setStudentToDelete(null);
      loadStudents();
    } catch (err) {
      showNotification(err.message || 'Failed to delete student', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearch('');
    setDepartment('All');
    setYear('All');
    setSortBy('createdAt');
    setOrder('desc');
    setCurrentPage(1);
  };

  return (
    <div className={`academic-app-shell ${isSidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
      {/* Collapsible Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'add' && editingStudent) {
            setEditingStudent(null);
          }
          setActiveTab(tab);
        }}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        totalStudents={total}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main App Viewport */}
      <div className="academic-viewport">
        {/* Clean Top Navigation Bar with Prachi Lohkare (PRN: 202401040025) */}
        <Topbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'add' && editingStudent) {
              setEditingStudent(null);
            }
            setActiveTab(tab);
          }}
          onOpenAbout={() => setIsAboutOpen(true)}
          onQuickEnroll={() => {
            setEditingStudent(null);
            setActiveTab('add');
          }}
          searchQuery={search}
          setSearchQuery={setSearch}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Dynamic Page Views */}
        <main className="academic-content-area">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <Dashboard
              setActiveTab={setActiveTab}
              onEditStudent={handleEdit}
              onViewStudent={handleView}
            />
          )}

          {/* TAB 2: STUDENT RECORDS DIRECTORY */}
          {activeTab === 'students' && (
            <div className="directory-view-wrapper">
              <div className="academic-view-header">
                <div className="view-header-details">
                  <div className="view-title-row">
                    <h2>Student Records Directory</h2>
                    <span className="view-count-badge">{total} Enrolled</span>
                  </div>
                  <p className="view-subtitle">
                    Search, filter, sort, and manage all registered student profiles in MongoDB Atlas
                  </p>
                </div>
                <button
                  className="btn-primary-purple"
                  onClick={() => {
                    setEditingStudent(null);
                    setActiveTab('add');
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Enroll New Student</span>
                </button>
              </div>

              {/* Redesigned Query Toolbar */}
              <QueryBar
                search={search}
                setSearch={setSearch}
                department={department}
                setDepartment={setDepartment}
                year={year}
                setYear={setYear}
                sortBy={sortBy}
                setSortBy={setSortBy}
                order={order}
                setOrder={setOrder}
                onReset={handleResetFilters}
              />

              {/* Modern Table Layout */}
              <StudentTable
                students={students}
                loading={loading}
                onView={handleView}
                onEdit={handleEdit}
                onDeleteRequest={(student) => setStudentToDelete(student)}
                onClearFilters={handleResetFilters}
              />

              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                total={total}
                limit={limit}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}

          {/* TAB 3: ADD / EDIT STUDENT FORM */}
          {activeTab === 'add' && (
            <div className="form-view-wrapper">
              <div className="academic-view-header">
                <div className="view-header-details">
                  <div className="view-title-row">
                    <h2>{editingStudent ? 'Update Student Record' : 'Student Enrollment'}</h2>
                    {editingStudent && (
                      <span className="view-count-badge edit-badge">
                        PRN: {editingStudent.prn}
                      </span>
                    )}
                  </div>
                  <p className="view-subtitle">
                    {editingStudent
                      ? `Modifying database record for ${editingStudent.name} (${editingStudent.prn})`
                      : 'Register a new student into the MongoDB Atlas student_management collection'}
                  </p>
                </div>
                <button
                  className="btn-secondary-purple"
                  onClick={() => {
                    setEditingStudent(null);
                    setActiveTab('students');
                  }}
                >
                  ← Back to Directory
                </button>
              </div>

              <StudentForm
                editingStudent={editingStudent}
                onSuccess={handleFormSuccess}
                onCancel={handleCancelEdit}
                showNotification={showNotification}
              />
            </div>
          )}
        </main>

        {/* Academic Portal Footer */}
        <footer className="academic-footer">
          <div className="footer-content">
            <div className="footer-left">
              <strong>StudentSphere</strong> — Modern Academic Student Management Portal &bull; Assignment 7
            </div>
            <div className="footer-right">
              Student: <strong>Prachi Lohkare</strong> (PRN: <strong>202401040025</strong>) &bull; MITAOE Computer Engineering
            </div>
          </div>
        </footer>
      </div>

      {/* View Student Details Modal */}
      <ViewStudentModal
        student={viewingStudent}
        onClose={() => setViewingStudent(null)}
        onEdit={handleEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        student={studentToDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setStudentToDelete(null)}
        deleting={deleting}
      />

      {/* About & System Profile Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Toast Notification Popup */}
      <Notification
        notification={notification}
        onClose={closeNotification}
      />
    </div>
  );
}
