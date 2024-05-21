import fs from 'fs'
import path from 'path';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars'

export async function generateInvoicePdf(name: string) {
    let templatePath = path.join(__dirname, "../templates", "pdf.html")
    let templateHtml = fs.readFileSync(templatePath, 'utf-8')

    let template = handlebars.compile(templateHtml);
    let html = template({ name });

    let now = new Date();
    let milis = now.getTime();
    // console.log(path);


    let pdfPath = path.join(
        __dirname,
        `../../public/pdf`,
        `${'Invoice'}-${name}-${milis}.pdf`
    );

    let options: any = {
        format: 'A4',
        margin: {
            top: '30px',
            bottom: '30px',
            right: '30px',
            left: '30px',
        },
        printBackground: true,
        path: pdfPath,
    };

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true,
    });

    var page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: 'networkidle0',
    });
    await page.addStyleTag({
        path: `./src/templates/style.css`,
    });
    await page.pdf(options);
    await browser.close();

    return pdfPath
}