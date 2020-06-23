import base64
import secrets

from django.core.files.base import ContentFile
from django.db.models import Model
from rest_framework.exceptions import ValidationError


class ModelWithImage(Model):

    def set_image(self, image):
        if image and ';base64' in image:
            try:
                format, imgstr = image.split(';base64,')
                ext = format.split('/')[-1]
                file = ContentFile(base64.b64decode(imgstr), name=secrets.token_urlsafe(16) + '.' + ext)
                self.image = file
            except ValueError:
                raise ValidationError('Incorrect image.')
        elif not image:
            self.image = None
        else:
            return
        self.save()

    class Meta:
        abstract = True
