#!/usr/bin/env node

const http = require('http');

function testEndpoint(path, name) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3200,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    console.log(`\nTesting ${name} endpoint (${path})...`);
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        if (data) {
          try {
            const parsed = JSON.parse(data);
            console.log('Response:', JSON.stringify(parsed, null, 2));
          } catch (e) {
            console.log('Response:', data);
          }
        }
        
        if (res.statusCode === 200) {
          console.log(`✅ ${name} check PASSED`);
          resolve(true);
        } else {
          console.log(`❌ ${name} check FAILED`);
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ ${name} check ERROR:`, error.message);
      resolve(false);
    });

    req.on('timeout', () => {
      console.error(`❌ ${name} check TIMEOUT`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function runAllTests() {
  console.log('🏥 Starting Health Check Tests...\n');
  
  const results = [];
  
  // Test all endpoints
  results.push(await testEndpoint('/ready', 'Readiness'));
  results.push(await testEndpoint('/health', 'Application Health'));
  results.push(await testEndpoint('/health/db', 'Database Health'));
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Results Summary:');
  console.log('='.repeat(50));
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${total - passed}`);
  
  if (passed === total) {
    console.log('\n🎉 All health checks PASSED!');
    process.exit(0);
  } else {
    console.log(`\n❌ ${total - passed} health check(s) FAILED!`);
    process.exit(1);
  }
}

// Start tests
runAllTests().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});