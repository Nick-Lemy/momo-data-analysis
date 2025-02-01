let xmlString = `
<sms_data>
    <sms>
        <body>You have received 5000 RWF from John Doe. Transaction ID: 123456. Date: 2024-01-01 10:00:00.</body>
    </sms>
    <sms>
        <body>TxId: 789012. Your payment of 1500 RWF to Jane Smith has been completed. Date: 2024-01-02 14:30:00.</body>
    </sms>
    <sms>
        <body>*162*TxId:345678*S*Your payment of 3000 RWF to Airtime has been completed. Fee: 50 RWF. Date: 2024-01-03 16:00:00.</body>
    </sms>
    <sms>
        <body>You Wakuma Tekalign DEBELA have via agent: Jane Doe (250123456789), withdrawn 20000 RWF on 2024-01-04 12:00:00.</body>
    </sms>
    <sms>
        <body>Yello! You have purchased an internet bundle of 1GB for 2000 RWF valid for 30 days.</body>
    </sms>
</sms_data>
`;
const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");
const smss = xmlDocument.querySelectorAll("sms");
for (const sms of smss) {
  console.log(sms);
}
