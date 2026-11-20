from django.shortcuts import render
from rest_framework import generics
from .models import AsignacionPieza, Producto, Pieza
from .serializer import AsignacionSerializer, ProductoSerializer, PiezaSerializer

# Create your views here.
class ListaAsignacionView(generics.ListCreateAPIView):
    queryset = AsignacionPieza.objects.all()
    serializer_class = AsignacionSerializer


class AsignacionDetalleView(generics.RetrieveUpdateDestroyAPIView):
    queryset =  AsignacionPieza.objects.all()
    serializer_class = AsignacionSerializer

class ListaProductoView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoDetalleView(generics.RetrieveUpdateDestroyAPIView):
    queryset =  Producto.objects.all()
    serializer_class = ProductoSerializer

class ListaPiezaView(generics.ListCreateAPIView):
    queryset = Pieza.objects.all()
    serializer_class = PiezaSerializer

class PiezaDetalleView(generics.RetrieveUpdateDestroyAPIView):
    queryset =  Pieza.objects.all()
    serializer_class = PiezaSerializer
