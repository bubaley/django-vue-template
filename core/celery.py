import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.common')

app = Celery('core')
app.config_from_object('django.conf:settings')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    # 'example_command': {
    #     'task': 'example_task',
    #     'schedule': crontab(minute='*/10')
    # },
}
