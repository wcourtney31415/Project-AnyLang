package any_lang.java;

import java.util.ArrayList;

public class AccountHolder {

	String id, name;
	double balance;

	ArrayList<Transaction> transactions = new ArrayList<Transaction>();

	String lineBreak = "---------------------------------";

	public AccountHolder(String id, String name, double balance2, ArrayList<Transaction> transactions) {
		super();
		this.id = id;
		this.name = name;
		this.balance = balance2;
		this.transactions = transactions;
	}

	private double roundToTwo(double a) {
		return Math.round(a * 100.0) / 100.0;
	}

	public String toString() {
		String output = "";
		output += lineBreak + "\n";
		output += "Account: " + id + "\n";
		output += name + "\n";
		output += lineBreak + "\n";
		double runningTotal = balance;
		for (Transaction transaction : transactions) {
			String symbol = "+ ";
			output += "Balance: " + runningTotal + "\n";
			runningTotal += roundToTwo(transaction.ammount);
			if (transaction.ammount < 0) {
				transaction.ammount *= -1;
				symbol = "- ";
			}
			output += symbol + roundToTwo(transaction.ammount) + "\n";
		}
		output += "Balance: " + roundToTwo(runningTotal) + "\n";
		output += lineBreak + "\n";
		return output;
	}

}
