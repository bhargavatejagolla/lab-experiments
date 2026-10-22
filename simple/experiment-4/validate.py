
from lxml import etree

doc = etree.parse("bookstore.xml")

dtd = etree.DTD("bookstore.dtd")
print("DTD:", dtd.validate(doc))

xsd = etree.XMLSchema(etree.parse("bookstore.xsd"))
print("XSD:", xsd.validate(doc))
