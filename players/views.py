from players.models import Player
from django.http import JsonResponse
from players.serializers import PlayerSerializer

def players(request):
    data = Player.objects.all()
    serializer = PlayerSerializer(data, many=True)
    return JsonResponse({'player': serializer.data})

    