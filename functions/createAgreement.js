const hbs  = require('handlebars');
const fs   = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');

const uploadFiles = require('./uploadFile');

const filePath = path.join(process.cwd(),'files','agreement.hbs')

async function createAgreement(project) {
    const html = await fs.readFile(filePath,'utf8')
    const content = await hbs.compile(html)("hi")

    const browser = await puppeteer.launch({
        headless: false,
        timeout: 0
    })
    const page = await browser.newPage()
    await page.setContent(content)

    const pdf = await page.pdf({
        format:'A4',
        printBackground:true
    })

    const files = [{
        originalname: `Ramya_Dental_Clinic_Service_Agreement_${project.userId.name}.pdf`,
        buffer: pdf
    }]
    await browser.close()
    return await uploadFiles(files);
}

module.exports = createAgreement;