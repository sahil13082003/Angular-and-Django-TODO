
from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

    # def create(self, validated_data):
    #     return Todo.objects.create(**validated_data)
    
    # def update(self, instance, validated_data):
    #     instance.task = validated_data.get('task', instance.task)
    #     instance.completed = validated_data.get('completed', instance.completed)
    #     instance.save()
    #     return instance

    # def delete(self, instance):
    #     instance.delete()