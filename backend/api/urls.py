from django.urls import path
from .views import ListaProductoView, ProductoDetalleView, ListaPiezaView, PiezaDetalleView, ListaAsignacionView, AsignacionDetalleView 

urlpatterns = [
    path("productos/", ListaProductoView.as_view(), name="productos-lista"),
    path("productos/<int:pk>/", ProductoDetalleView.as_view(), name="producto-detalle"),

    path("piezas/", ListaPiezaView.as_view(), name="piezas-lista"),
    path("piezas/<int:pk>/", PiezaDetalleView.as_view(), name="pieza-detalle"),

    path("asignaciones/", ListaAsignacionView.as_view(), name="asignaciones-lista"),
    path("asignaciones/<int:pk>/", AsignacionDetalleView.as_view(), name="asignacion-detalle"),
]