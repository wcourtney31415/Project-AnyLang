package any_lang.java;

public class Transaction {
	
	String id;
	double ammount;

	public Transaction(String id, double ammount) {
		super();
		this.id = id;
		this.ammount = ammount;
	}
	
	public String toString() {
		return "Id: " + id + " Ammount: " + ammount;
	}
	
}
