from players.models import Player
from django.http import JsonResponse
from players.serializers import PlayerSerializer

def players(request):
    data = Player.objects.all()
    serializer = PlayerSerializer(data, many=True)
    return JsonResponse({'player': serializer.data})

def player(request, id):
    data = Player.objects.get(pk=id)
    serializer = PlayerSerializer(data)
    return JsonResponse({'player': serializer.data})