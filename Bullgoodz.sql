Create database bullgoodz;

use bullgoodz;

create table User(
User_ID int not null,
First_Name Varchar (20),
Last_Name Varchar (20),
School_email Varchar (100),
Phone_Number Varchar (15),
Password Varchar (20),
Primary key (User_ID)
);

create table Seller(
Seller_ID int,
User_ID int,
Product_ID int,
Description text,
Primary key (Seller_ID),
Foreign key (User_ID) references User(User_ID)
);

Create table Wishlist(
Wishlist_ID int,
Seller_ID int,
Product_ID int,
Primary key (Wishlist_ID),
Foreign key (Seller_ID) references Seller(Seller_ID),
Foreign key (Product_ID) references Product(Product_ID)
);

Create table Product(
Product_ID int,
Seller_ID int,
Category_ID int,
Description Varchar (200),
Quantity int,
Price Decimal (4,0),
Category Varchar (20),
Primary key (Product_ID),
Foreign key (Seller_ID) references Seller(Seller_ID)
);

Create table admin(
Admin_Email varchar (100),
Admin_Password Varchar (50)
);
Insert into admin
values
("nationaluniversity@gmail.com", "123456789"),
("jensensantillan@gmail.com", "123456789");

Alter table Seller
add Foreign key (Product_ID) references Product(Product_ID);

Select * from admin
