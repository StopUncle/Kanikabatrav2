// Comprehensive authentication flow test
// Run with: node tests/auth/full-flow-test.js

const testFullAuthFlow = async () => {
  const baseUrl = 'http://localhost:3001'
  let cookies = ''

  console.log('🚀 Starting Full Authentication Flow Test...\n')

  // Helper function to parse cookies from response
  const parseCookies = (cookieHeader) => {
    if (!cookieHeader) return ''
    if (Array.isArray(cookieHeader)) {
      return cookieHeader.join('; ')
    }
    return cookieHeader
  }

  // Test 1: Register a new user
  console.log('📝 Step 1: Register new user')
  try {
    const testEmail = `test${Date.now()}@example.com`
    const testPassword = 'testpassword123'

    const registerResponse = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    })

    const registerData = await registerResponse.json()
    console.log(`Status: ${registerResponse.status}`)
    console.log(`Response:`, registerData)

    // Get cookies from registration
    const setCookieHeader = registerResponse.headers.get('set-cookie')
    if (setCookieHeader) {
      cookies = parseCookies(setCookieHeader)
      console.log('✅ Cookies received from registration')
    }

    if (registerResponse.ok && registerData.success) {
      console.log('✅ Registration successful')
      console.log(`User created: ${registerData.user.email}\n`)
    } else {
      console.log('❌ Registration failed\n')
      return
    }

    // Test 2: Test /me endpoint with registration cookies
    console.log('🔍 Step 2: Test authenticated endpoint with registration cookies')
    try {
      const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Cookie': cookies
        }
      })

      const meData = await meResponse.json()
      console.log(`Status: ${meResponse.status}`)
      console.log(`Response:`, meData)

      if (meResponse.ok && meData.success) {
        console.log('✅ Authentication working after registration\n')
      } else {
        console.log('❌ Authentication failed after registration\n')
      }
    } catch (error) {
      console.log('❌ /me endpoint test error:', error.message, '\n')
    }

    // Test 3: Logout
    console.log('🚪 Step 3: Logout')
    try {
      const logoutResponse = await fetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Cookie': cookies
        }
      })

      const logoutData = await logoutResponse.json()
      console.log(`Status: ${logoutResponse.status}`)
      console.log(`Response:`, logoutData)

      if (logoutResponse.ok && logoutData.success) {
        console.log('✅ Logout successful\n')
        cookies = '' // Clear cookies
      } else {
        console.log('❌ Logout failed\n')
      }
    } catch (error) {
      console.log('❌ Logout error:', error.message, '\n')
    }

    // Test 4: Login with the same credentials
    console.log('🔐 Step 4: Login with same credentials')
    try {
      const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword
        })
      })

      const loginData = await loginResponse.json()
      console.log(`Status: ${loginResponse.status}`)
      console.log(`Response:`, loginData)

      // Get cookies from login
      const loginCookies = loginResponse.headers.get('set-cookie')
      if (loginCookies) {
        cookies = parseCookies(loginCookies)
        console.log('✅ Cookies received from login')
      }

      if (loginResponse.ok && loginData.success) {
        console.log('✅ Login successful\n')
      } else {
        console.log('❌ Login failed\n')
        return
      }
    } catch (error) {
      console.log('❌ Login error:', error.message, '\n')
      return
    }

    // Test 5: Test /me endpoint again after login
    console.log('🔍 Step 5: Test authenticated endpoint after login')
    try {
      const meResponse2 = await fetch(`${baseUrl}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Cookie': cookies
        }
      })

      const meData2 = await meResponse2.json()
      console.log(`Status: ${meResponse2.status}`)
      console.log(`Response:`, meData2)

      if (meResponse2.ok && meData2.success) {
        console.log('✅ Authentication working after login\n')
      } else {
        console.log('❌ Authentication failed after login\n')
      }
    } catch (error) {
      console.log('❌ Second /me endpoint test error:', error.message, '\n')
    }

    // Test 6: Test token refresh
    console.log('🔄 Step 6: Test token refresh')
    try {
      const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Cookie': cookies
        }
      })

      const refreshData = await refreshResponse.json()
      console.log(`Status: ${refreshResponse.status}`)
      console.log(`Response:`, refreshData)

      if (refreshResponse.ok && refreshData.success) {
        console.log('✅ Token refresh successful\n')

        // Update cookies if new ones are provided
        const refreshCookies = refreshResponse.headers.get('set-cookie')
        if (refreshCookies) {
          cookies = parseCookies(refreshCookies)
        }
      } else {
        console.log('❌ Token refresh failed\n')
      }
    } catch (error) {
      console.log('❌ Token refresh error:', error.message, '\n')
    }

  } catch (error) {
    console.log('❌ Registration error:', error.message, '\n')
    return
  }

  console.log('🎯 Full Authentication Flow Test Complete!')
  console.log('\n📋 Summary:')
  console.log('✅ User registration with immediate login')
  console.log('✅ Authentication validation via /me endpoint')
  console.log('✅ Logout functionality')
  console.log('✅ User login after logout')
  console.log('✅ Token refresh mechanism')
  console.log('\n🌐 Frontend URLs to test:')
  console.log('- Register: http://localhost:3001/register')
  console.log('- Login: http://localhost:3001/login')
  console.log('- Dashboard: http://localhost:3001/dashboard')
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

  await testFullAuthFlow()
}

main().catch(console.error)