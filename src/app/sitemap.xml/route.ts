
const URL = 'https://qrcode.fabra.dev'

function generateSiteMap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${URL}</loc>
      <lastmod>2024-03-16</lastmod>
      <changefreq>yearly</changefreq>
      <priority>0.5</priority>
    </url>
   </urlset>
 `
}

export async function GET() {
    const body = generateSiteMap()

    return new Response(body, {
        status: 200,
        headers: {
            'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
            'content-type': 'application/xml',
        },
    })
}
