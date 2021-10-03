package any_lang.java;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class App {

	private static ArrayList<String> getLinesFromFile(String file) {
		ArrayList<String> ret = new ArrayList<String>();
		try (BufferedReader br = new BufferedReader(new FileReader(file))) {
			String line;
			while ((line = br.readLine()) != null) {
				ret.add(line);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ret;
	}

	private static void writeToFile(String fileName, String text) {
		BufferedWriter writer;
		try {
			writer = new BufferedWriter(new FileWriter(fileName, true));
		    writer.append(text);
		    writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	    
	}
	
	public static void main(String[] args) {
		String file = "input.txt";
		ArrayList<String> lines = getLinesFromFile(file);
		ArrayList<AccountHolder> accounts = new ArrayList<AccountHolder>();
		for (String line : lines) {
			String[] fields = line.split(",");
			String header = fields[0];
			if (header.equals("new-account")) {
				String id = fields[1];
				String name = fields[2];
				double balance = Double.parseDouble(fields[3]);
				ArrayList<Transaction> transactions = new ArrayList<Transaction>();
				AccountHolder account = new AccountHolder(id, name, balance, transactions);
				accounts.add(account);
			} else if (header.equals("transaction")) {
				String id = fields[1];
				double ammount = Double.parseDouble(fields[2]);
				Transaction transaction = new Transaction(id, ammount);
				for (AccountHolder account : accounts) {
					if (account.id.equals(id)) {
						account.transactions.add(transaction);
					}
				}
			}
		}
		String output = "";
		for (AccountHolder account : accounts) {
			output += account.toString() + "\n\n";
		}
		System.out.print(output);
		writeToFile("output.txt", output);
	}

}
