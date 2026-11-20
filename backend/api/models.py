from django.db import models


class Producto(models.Model):
    producto = models.AutoField(primary_key=True)
    nombre = models.TextField(max_length=100)
    descripcion = models.TextField(max_length=300)
    precio = models.DecimalField(max_digits=18, decimal_places=2)
    fechaMod = models.DateTimeField()
    archivo = models.BigIntegerField()

class Pieza(models.Model):
    piezaId = models.AutoField(primary_key=True)
    nombre = models.TextField(max_length=100)
    descripcion = models.TextField(auto_created=300)
    material = models.TextField(max_length=100)
    esOriginal = models.BigIntegerField()
    fechaMod = models.DateTimeField()
    archivo = models.BigIntegerField()

class AsignacionPieza(models.Model):
    asignacionPiezaId = models.AutoField(primary_key=True)
    codigo = models.IntegerField()
    fechaMod = models.DateTimeField
    archivo = models.ForeignKey(Pieza, on_delete= models.CASCADE, related_name="piezas")
    productId = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="productos")

    def __str__(self):
        return self.nombre