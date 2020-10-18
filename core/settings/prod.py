from .common import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

STATIC_DIR = root('static')
STATIC_ROOT = root('static')

if env.str('SENTRY_DSN', ''):
    sentry_sdk.init(
        dsn=env.str('SENTRY_DSN'),
        integrations=[DjangoIntegration()],
        environment=env.str('ENVIRONMENT', 'prod'),
        send_default_pii=True
    )
