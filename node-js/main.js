var filename = "input.txt";

var lines = require('fs')
    .readFileSync(filename, 'utf-8')
    .split('\n')
    .filter(Boolean);

var accounts = [];

lines.forEach(line => {
    var fields = line.split(",");
    type = fields[0];
    switch (type) {
        case "new-account":
            id = fields[1];
            holder = fields[2];
            balance = fields[3];
            newAccount =
            {
                "id": id,
                "holder": holder,
                "balance": balance,
                "transactions": []
            }
            accounts.push(newAccount);
            break;
        case "transaction":
            id = fields[1];
            ammount = fields[2];
            accounts.forEach(account => {
                if (account.id == id) {
                    var transactions = account.transactions;
                    var newBalance;
                    if (transactions.length > 0) {
                        var lastIndex = transactions.length - 1;
                        var lastTransaction = transactions[lastIndex];
                        previousBalance = lastTransaction[1];
                        newBalance = +ammount + +previousBalance;
                    } else {
                        newBalance = +ammount + +account.balance;
                    }
                    newTransaction = [ammount, newBalance];
                    account.transactions.push(newTransaction);
                }
            });
            break;
        default:
            console.log("Error! " + type)
    }
});

var example = {
    "id": 0
    , "holder": "Peter Parker"
    , "balance": 122.53
    , "transactions": [
        [3, 125.53],
        [4, 129.53],
        [7, 136.53]
    ]
}

function symbol(x) {
    if (x > -1) {
        return "+ ";
    } else {
        return "- ";
    }
}

function printAcc(accRecord) {
    const lineBreak = "---------------------------------\n";
    var transactions = "";
    accRecord.transactions.forEach(element => {
        ammount = element[0];
        sym = symbol(ammount);
        newBalance = element[1];
        if (ammount < 0) {
            ammount *= -1;
        }
        transactions += sym + ammount + "\n";
        transactions += "Balance: " + newBalance.toFixed(2) + "\n";
    });
    var outString =
        lineBreak
        + "Account: " + accRecord.id + "\n"
        + accRecord.holder + "\n"
        + lineBreak
        + "Balance: " + accRecord.balance + "\n"
        + transactions + "\n"
        + lineBreak + "\n\n\n";
    return outString;
}

accounts.forEach(account => {
    var str = printAcc(account);
    console.log(str);
});
