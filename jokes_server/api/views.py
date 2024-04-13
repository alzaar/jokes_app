import os
import requests
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin
from django.http import JsonResponse


def get_file_path(file_name):
    return os.path.join(BASE_DIR, "api", "assets", file_name)


class JokesView(RetrieveModelMixin, GenericAPIView):
    def get(self, request, *args, **kwargs):
        joke = requests.get(
            "https://official-joke-api.appspot.com/jokes/programming/random"
        ).json()

        cat_image = requests.get(
            "https://api.thecatapi.com/v1/images/search?limit=1"
        ).json()

        if "type" not in joke and "url" in cat_image[0]:
            print(joke, cat_image)
            joke.update(cat_image)
            return JsonResponse(joke)
        else:
            return JsonResponse(
                {
                    "setup": "No joke found",
                    "url": "No image found",
                    "punchline": "api limit exceeded; try after 15 minutes",
                }
            )
