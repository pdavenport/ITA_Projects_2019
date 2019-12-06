/* my sql problems */

SELECT * FROM Shippers

select CategoryName, Description from Categories;

select FirstName, LastName, HireDate from employees

select FirstName, LastName, HireDate from employees where Title = "Sales Representative" and Country = "USA"

select OrderID, OrderDate from Orders where EmployeeID = "5"

select SupplierID, ContactName, ContactTitle from Suppliers where ContactTitle != "Marketing Manager"

select * from products where ProductName like "%queso%"

select OrderID, CustomerID, ShipCountry from Orders where ShipCountry like "%France%" or ShipCountry like "%Belgium%"

select OrderID, CustomerID, ShipCountry from Orders where ShipCountry in ("Brazil", "Mexico", "Argentina", "Venezuela")

select FirstName, LastName, Title, BirthDate from Employees order by BirthDate Asc

select FirstName, LastName, Title, Date(BirthDate) from Employees order by BirthDate Asc

select FirstName, LastName, concat(FirstName, ' ', LastName) as FullName from Employees

select OrderID, ProductID, UnitPrice, Quantity, Quantity * UnitPrice as TotalPrice from OrderDetails group by OrderID, ProductID

select count(*) from Customers

select min(OrderDate) as FirstOrder from Orders 

SELECT DISTINCT ShipCountry as Country from Orders order by ShipCountry asc

SELECT ContactTitle, count(*) as TotalContactTitle FROM Customers group by ContactTitle order by TotalContactTitle desc

SELECT 
Products.ProductID,
Products.ProductName,
Suppliers.CompanyName AS Supplier
FROM
Suppliers
LEFT JOIN
Products ON Suppliers.SupplierID = Products.SupplierID