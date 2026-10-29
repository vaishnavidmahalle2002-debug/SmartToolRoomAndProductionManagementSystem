// ==========================================
// YantraX - Reports
// ==========================================

const BASE_URL = API_CONFIG.BASE_URL;


// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadReportSummary();

};


// ==========================================
// Dashboard Summary
// ==========================================

function loadReportSummary(){

    console.log("Reports Dashboard Loaded");

}



// ==========================================
// Customer Report
// ==========================================

function customerReport(){

    window.open(
        BASE_URL + "/customerReport",
        "_blank"
    );

}



// ==========================================
// Worker Report
// ==========================================

function workerReport(){

    window.open(
        BASE_URL + "/workerReport",
        "_blank"
    );

}



// ==========================================
// Machine Report
// ==========================================

function machineReport(){

    window.open(
        BASE_URL + "/machineReport",
        "_blank"
    );

}



// ==========================================
// Material Report
// ==========================================

function materialReport(){

    window.open(
        BASE_URL + "/materialReport",
        "_blank"
    );

}



// ==========================================
// Job Order Report
// ==========================================

function jobOrderReport(){

    window.open(
        BASE_URL + "/jobOrderReport",
        "_blank"
    );

}



// ==========================================
// Payment Report
// ==========================================

function paymentReport(){

    window.open(
        BASE_URL + "/paymentReport",
        "_blank"
    );

}



// ==========================================
// Invoice Report
// ==========================================

function invoiceReport(){

    window.open(
        BASE_URL + "/invoiceReport",
        "_blank"
    );

}



// ==========================================
// Job Status Report
// ==========================================

function jobStatusReport(){

    window.open(
        BASE_URL + "/jobStatusReport",
        "_blank"
    );

}



// ==========================================
// Download PDF
// ==========================================

function downloadPDF(reportName){

    window.open(
        BASE_URL + "/downloadReport/" + reportName,
        "_blank"
    );

}



// ==========================================
// Download Excel
// ==========================================

function downloadExcel(reportName){

    window.open(
        BASE_URL + "/downloadExcel/" + reportName,
        "_blank"
    );

}