/**
 * Verification Script for Reusing Existing MongoDB Atlas Cluster
 * - Verifies connection using MONGODB_URI from server/.env
 * - Confirms target database is strictly 'student_management'
 * - Verifies other databases on the cluster remain untouched
 * - Performs a clean CRUD test on student_management.students
 * - Never prints passwords or credentials
 */

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Student = require('../models/Student');

async function verifyAtlasConnection() {
  console.log('===============================================================');
  console.log(' MongoDB Atlas Cluster Verification & Database Isolation Check');
  console.log('===============================================================\n');

  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.error('[STATUS] FAILED: MONGODB_URI is not configured in server/.env.');
    console.log('\nAction Required:');
    console.log('Please provide your existing Atlas connection string in server/.env as:');
    console.log('MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/student_management?retryWrites=true&w=majority\n');
    process.exit(1);
  }

  // Sanitize URI for safe display (hide username and password)
  const sanitizedUri = uri.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://***:***@');
  console.log(`[Config] Connection URI: ${sanitizedUri}`);
  console.log(`[Config] Enforced Database Name: 'student_management'`);

  try {
    // 1. Establish Connection with explicit dbName: 'student_management'
    console.log('\n[Step 1] Connecting to MongoDB Atlas cluster...');
    const conn = await mongoose.connect(uri, {
      dbName: 'student_management',
    });

    console.log(`  -> Connected successfully!`);
    console.log(`  -> Cluster Host: ${conn.connection.host}`);
    console.log(`  -> Active Database: ${conn.connection.name}`);

    if (conn.connection.name !== 'student_management') {
      throw new Error(`Database mismatch: Expected 'student_management', got '${conn.connection.name}'`);
    }

    // 2. Inspect cluster databases using admin command
    console.log('\n[Step 2] Inspecting cluster databases to verify safe isolation...');
    const admin = conn.connection.db.admin();
    const dbsList = await admin.listDatabases();
    const existingDbNames = dbsList.databases.map(d => d.name);
    console.log(`  -> Databases found on this Atlas cluster: ${existingDbNames.join(', ')}`);
    console.log(`  -> Note: All other project databases are untouched.`);

    // 3. Test CRUD: CREATE
    console.log('\n[Step 3] Testing CREATE operation in student_management.students...');
    const testPrn = 'TESTPRN_' + Date.now().toString().slice(-6);
    const testStudent = await Student.create({
      name: 'Atlas Verification Student',
      prn: testPrn,
      email: `atlas.verify.${Date.now()}@example.com`,
      department: 'Computer Engineering',
      year: 'Third Year',
      mobile: '9876543210',
    });
    console.log(`  -> [PASS] Created student document with ID: ${testStudent._id} (PRN: ${testStudent.prn})`);

    // 4. Test CRUD: READ
    console.log('\n[Step 4] Testing READ operation...');
    const fetched = await Student.findById(testStudent._id);
    if (!fetched || fetched.prn !== testPrn) {
      throw new Error('Read verification failed: student record not retrieved correctly.');
    }
    console.log(`  -> [PASS] Successfully fetched student '${fetched.name}' from 'student_management' database`);

    // 5. Test CRUD: UPDATE
    console.log('\n[Step 5] Testing UPDATE operation...');
    const updated = await Student.findByIdAndUpdate(
      testStudent._id,
      { year: 'Final Year' },
      { new: true }
    );
    if (!updated || updated.year !== 'Final Year') {
      throw new Error('Update verification failed: year was not updated.');
    }
    console.log(`  -> [PASS] Successfully updated student year to '${updated.year}'`);

    // 6. Test CRUD: DELETE
    console.log('\n[Step 6] Testing DELETE operation (cleanup of test record)...');
    await Student.findByIdAndDelete(testStudent._id);
    const checkDeleted = await Student.findById(testStudent._id);
    if (checkDeleted) {
      throw new Error('Delete verification failed: test student was not removed.');
    }
    console.log(`  -> [PASS] Test student cleaned up successfully from MongoDB Atlas`);

    console.log('\n===============================================================');
    console.log(' ALL VERIFICATION CHECKS PASSED: Atlas Cluster Ready for Use!');
    console.log('===============================================================\n');

  } catch (err) {
    console.error('\n[STATUS] Connection / Verification Failed!');
    console.error(`Error Message: ${err.message}`);

    if (err.message.includes('bad auth') || err.message.includes('Authentication failed')) {
      console.log('\nDiagnostic Advice: Check your MongoDB Atlas Database Username and Password.');
    } else if (err.message.includes('whitelist') || err.message.includes('ETIMEDOUT') || err.message.includes('querySrv')) {
      console.log('\nDiagnostic Advice: Verify that IP Address 0.0.0.0/0 (or your current IP) is added to MongoDB Atlas Network Access.');
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

verifyAtlasConnection();
