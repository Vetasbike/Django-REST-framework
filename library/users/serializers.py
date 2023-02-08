from rest_framework.serializers import ModelSerializer
from .models import User

class UserModelSerialiser(ModelSerializer):
    
    class Meta:
        
        model = User
        fields = '__all__'
        # fields = ('id', 'first_name', 'last_name', 'birthday_year email')
        