const hbs  = require('handlebars');
const fs   = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');

const uploadFiles = require('./uploadFile');

const filePath = path.join(process.cwd(),'files','pdf.hbs')
console.log(filePath);

async function createAgreement(project) {
    const html = await fs.readFile(filePath,'utf8')
    const content = await hbs.compile(html)(project.toJSON())

    const browser = await puppeteer.launch({
        headless: true,
        timeout: 0,
        args: ["--no-sandbox"]
    })
    const page = await browser.newPage()
    await page.setContent(content)

    const pdf = await page.pdf({
        format:'A4',
        printBackground:true
    })

    const files = [{
        originalname: `Ramya_Dental_Clinic_Service_Agreement_${project._id}.pdf`,
        buffer: pdf
    }]
    await browser.close()
    return await uploadFiles(files);
}

module.exports = createAgreement;