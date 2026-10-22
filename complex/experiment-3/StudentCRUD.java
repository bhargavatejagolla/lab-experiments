
import java.sql.*;
import java.util.Scanner;

public class StudentCRUD {
    public static void main(String[] args) throws Exception {
        Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/college", "root", "YOUR_PASSWORD");
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("\n1.Insert 2.Display 3.Update 4.Delete 5.Exit");
            int ch = sc.nextInt();

            if (ch == 5)
                break;

            PreparedStatement ps;
            int id, marks;

            switch (ch) {
                case 1:
                    id = sc.nextInt();
                    String name = sc.next();
                    marks = sc.nextInt();

                    ps = con.prepareStatement("INSERT INTO student VALUES(?,?,?)");
                    ps.setInt(1, id);
                    ps.setString(2, name);
                    ps.setInt(3, marks);
                    ps.executeUpdate();
                    System.out.println("Inserted");
                    break;
                case 2:
                    ResultSet rs = con.createStatement().executeQuery("SELECT * FROM student");
                    while (rs.next())
                        System.out.println(rs.getInt(1) + " " + rs.getString(2) + " " + rs.getInt(3));
                    break;

                case 3:
                    id = sc.nextInt();
                    marks = sc.nextInt();

                    ps = con.prepareStatement("UPDATE student SET marks=? WHERE id=?");
                    ps.setInt(1, marks);
                    ps.setInt(2, id);
                    ps.executeUpdate();
                    System.out.println("Updated");
                    break;

                case 4:
                    id = sc.nextInt();
                    ps = con.prepareStatement("DELETE FROM student WHERE id=?");
                    ps.setInt(1, id);
                    ps.executeUpdate();
                    System.out.println("Deleted");
                    break;

                default:
                    System.out.println("Invalid choice");
            }
        }

        con.close();
        sc.close();
    }
}
