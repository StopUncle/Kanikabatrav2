// Simple test script to verify authentication functionality
// Run with: node tests/auth/auth.test.js

const testAuth = async () => {
  const baseUrl = 'http://localhost:3001'

  console.log('🧪 Starting Authentication Tests...\n')

  // Test 1: Register a new user
  console.log('📝 Test 1: User Registration')
  try {
    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      })
    })

    const registerData = await registerResponse.json()
    console.log(`Status: ${registerResponse.status}`)
    console.log(`Response:`, registerData)

    if (registerResponse.ok) {
      console.log('✅ Registration successful\n')
    } else {
      console.log('❌ Registration failed\n')
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message, '\n')
  }

  // Test 2: Login with created user
  console.log('🔐 Test 2: User Login')
  try {
    const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      })
    })

    const loginData = await loginResponse.json()
    console.log(`Status: ${loginResponse.status}`)
    console.log(`Response:`, loginData)

    // Extract cookies from response
    const cookies = loginResponse.headers.get('set-cookie')
    console.log('Cookies set:', cookies ? 'Yes' : 'No')

    if (loginResponse.ok) {
      console.log('✅ Login successful\n')
    } else {
      console.log('❌ Login failed\n')
    }
  } catch (error) {
    console.log('❌ Login error:', error.message, '\n')
  }

  // Test 3: Test invalid login
  console.log('🚫 Test 3: Invalid Login')
  try {
    const invalidLoginResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
    })

    const invalidLoginData = await invalidLoginResponse.json()
    console.log(`Status: ${invalidLoginResponse.status}`)
    console.log(`Response:`, invalidLoginData)

    if (!invalidLoginResponse.ok) {
      console.log('✅ Invalid login properly rejected\n')
    } else {
      console.log('❌ Invalid login should have been rejected\n')
    }
  } catch (error) {
    console.log('❌ Invalid login test error:', error.message, '\n')
  }

  // Test 4: Test duplicate registration
  console.log('👥 Test 4: Duplicate Registration')
  try {
    const duplicateResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      })
    })

    const duplicateData = await duplicateResponse.json()
    console.log(`Status: ${duplicateResponse.status}`)
    console.log(`Response:`, duplicateData)

    if (duplicateResponse.status === 409) {
      console.log('✅ Duplicate registration properly rejected\n')
    } else {
      console.log('❌ Duplicate registration should have been rejected\n')
    }
  } catch (error) {
    console.log('❌ Duplicate registration test error:', error.message, '\n')
  }

  console.log('🎯 Authentication Tests Complete!')
  console.log('\n📋 Summary:')
  console.log('- User registration endpoint')
  console.log('- User login endpoint')
  console.log('- Invalid login handling')
  console.log('- Duplicate registration handling')
  console.log('\n✨ Next: Test the frontend at http://localhost:3001/login')
}

// Check if server is running
const checkServer = async () => {
  try {
    const response = await fetch('http://localhost:3001')
    return response.ok || response.status === 404 // 404 is fine, server is running
  } catch {
    return false
  }
}

// Main execution
const main = async () => {
  const serverRunning = await checkServer()

  if (!serverRunning) {
    console.log('❌ Server is not running on http://localhost:3001')
    console.log('💡 Please start the server first with: npm run dev')
    return
  }

  await testAuth()
}

main().catch(console.error)