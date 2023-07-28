<?php

namespace App\Interfaces;
interface CommonConstants {
    const ADMIN = 'admin';
    const SUPERADMIN = 'super_admin';
    const MANAGER = 'manager';
    const RECURRING = 'recurring';
    const SALE = 'sale';
    const SUPPLIER = 'supplier';
    const CLIENT = 'client';
    const INVENTORY = 'inventory';
    const CONCEPT = 'concept';
    const APP_USER = 'app_user';
    const COMPANY_USER = 'company_user';
    const SALESLUG = 'sales';
    const SUNDRYDEBTORSSLUG = 'sundry-debtors';
    const TAXSLUG = 'tax';
    const PRIMARY = 'primary';
    const SECONDARY = 'secondary';
    const CONTROL = 'control';
    const DETAIL = 'detail';
    const SERVICES = 'services';
    const NONINVENTORY = 'non-inventory';
    const INVOICE = 'invoice';
    const PAYMENTRECEIPT = 'payment_receipt';
    const INVENTORYADJUSTMENT = 'inventory-adjustment';
    const RECEIVABLEADJUSTMENT = 'receivable-adjustment';
    const SALEINVOICE = 'sale_invoice';
    const PAYMENT = 'payment';
    const SUPPLIERINVOICE = 'supplier_invoice';
    const EMPLOYEEPAYMENT = 'employee_payment';
    const BENEFIT = 'benefit';
    const ONETIME = 'one_time';
    const ASSETSCODE = 1;
    const LIABILITIESCODE = 2;
    const EQUITIESCODE = 3;
    const INCOMECODE = 4;
    const EXPENSESCODE = 5;
    const BANKCODE = 1000;
    const CASHONHAND = 1001;
    const ACCOUNTSRECEIVABLECODE = 1101;
    const OTHERCURRENTASSETSCODE = 1200;
    const INVENTORYCODE = 1204;
    const CURRENTTAXASSETS = 1216;
    const TAXINFAVOURCODE = 1300;
    const FIXEDASSETSCODE = 1500;
    const ACCOUNTSPAYABLECODE = 2000;
    const SALESTAXPAYABLECODE = 2510;
    const TAXTOPAYCODE = 2601;
    const PANDLCODE = 3015;
    const INITADJINVENTORY = 3501;
    const INVENTORYADJUSTMENTSCODE = 3502;
    const SALESOFPRODUCTINCOMECODE = 4004;
    const COGSCODE = 5006;
    const SUPPLIESANDMATERIALSCODE = 5005;
    const INCOMEMAINCODE = 4000;
    const COGSMAINCODE = 5000;
    const EXPENSESMAINCODE = 6000;
    const OTHERINCOMECODE = 8000;
    const OTHEREXPENSECODE = 9000;
    const PARENTACCOUNT = 'parent_account';
    const PAYROLLEXPENSECODE = 6019;
    const CREDITCARDCODE = 2100;
}