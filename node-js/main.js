var filename = "input.txt";

var lines = require('fs')
    .readFileSync(filename, 'utf-8')
    .split('\n')
    .filter(Boolean);

var accounts = [];

function lastElemOf(arr) {
    var finalIndex = arr.length - 1;
    var lastElem = arr[finalIndex];
    return lastElem;
}

function newAccount(id, holder, balance) {
    return {
        "id": id,
        "holder": holder,
        "balance": balance,
        "transactions": []
    };
}

lines.forEach(line => {
    var fields = line.split(",");
    type = fields[0];
    switch (type) {
        case "new-account":
            id = fields[1];
            holder = fields[2];
            balance = fields[3];
            account = newAccount(id, holder, balance);
            accounts.push(account);
            break;
        case "transaction":
            id = fields[1];
            ammount = fields[2];
            addTransaction(id, ammount);
            break;
        default:
            console.log("Error! " + type)
    }
});

function isEmpty(arr) {
    if (arr.length > 0) {
        return false;
    } else {
        return true;
    }
}


function addTransaction(id, ammount) {
    accounts.forEach(account => {
        if (account.id == id) {
            var transactions = account.transactions;
            var previousBalance;
            if (isEmpty(transactions)) {
                previousBalance = account.balance;
            } else {
                var previousTransaction = lastElemOf(transactions);
                previousBalance = lastElemOf(previousTransaction);
            }
            var newBalance = +ammount + +previousBalance;
            newTransaction = [ammount, newBalance];
            transactions.push(newTransaction);
        }
    });
}

function symbol(x) {
    if (x > -1) {
        return "+ ";
    } else {
        return "- ";
    }
}

function accToString(accRecord) {

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

var strBuild = "";

accounts.forEach(account => {
    var str = accToString(account);
    strBuild += str;
});

require('fs').writeFile('output.txt', strBuild, function (err) {
    if (err) return console.log(err);
  });