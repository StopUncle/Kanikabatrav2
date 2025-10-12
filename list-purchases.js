require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function listPurchases() {
  try {
    const purchases = await prisma.purchase.findMany({
      where: { type: 'BOOK' },
      select: {
        id: true,
        customerEmail: true,
        customerName: true,
        amount: true,
        status: true,
        productVariant: true,
        downloadCount: true,
        maxDownloads: true,
        createdAt: true,
        expiresAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    console.log('\n📚 Book Purchases in Database:\n')

    if (purchases.length === 0) {
      console.log('No purchases found.')
    } else {
      purchases.forEach(p => {
        console.log(`Email: ${p.customerEmail}`)
        console.log(`Name: ${p.customerName}`)
        console.log(`Amount: $${p.amount}`)
        console.log(`Status: ${p.status}`)
        console.log(`Variant: ${p.productVariant || 'Standard'}`)
        console.log(`Downloads: ${p.downloadCount}/${p.maxDownloads}`)
        console.log(`Created: ${p.createdAt.toLocaleDateString()}`)
        console.log(`Expires: ${p.expiresAt ? p.expiresAt.toLocaleDateString() : 'N/A'}`)
        console.log('---')
      })
    }
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

listPurchases()
