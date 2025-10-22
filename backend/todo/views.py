from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('-created_at')
    serializer_class = TodoSerializer

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

    # def get_queryset(self):
    #     return Todo.objects.filter(owner=self.request.user).order_by('-created_at')
    
    # def perform_update(self, serializer):
    #     serializer.save(owner=self.request.user)

    # def perform_destroy(self, instance):
    #     instance.delete()

