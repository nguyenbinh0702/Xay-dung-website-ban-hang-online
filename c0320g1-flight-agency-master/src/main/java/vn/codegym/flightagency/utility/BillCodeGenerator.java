package vn.codegym.flightagency.utility;

public class BillCodeGenerator {

    public static String generate(Long id) {
        StringBuilder s = new StringBuilder(id.toString());
        while (s.length() < 5) {
            s.insert(0, "0");
        }
        s.insert(0, "B");
        return s.toString();
    }
}
