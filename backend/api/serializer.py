from rest_framework import serializers
from .models import AsignacionPieza, Producto, Pieza

class AsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsignacionPieza
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class PiezaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pieza
        fields = '__all__'

