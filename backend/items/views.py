from django.shortcuts import render
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

# Create your views here.

class ItemViewSet(viewsets.ModelViewSet):
    """Provides list, create, retrieve, and partial-update actions."""
    queryset = Item.objects.all().order_by("id")
    serializer_class = ItemSerializer
