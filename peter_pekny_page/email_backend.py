import smtplib
import ssl
from django.core.mail.backends.smtp import EmailBackend


class UnsafeEmailBackend(EmailBackend):
    def open(self):
        """
        Open a network connection. If already open, return False.
        """
        if self.connection:
            return False

        connection_class = smtplib.SMTP_SSL if self.use_ssl else smtplib.SMTP

        try:
            # Vypneme overovanie certifikátu
            context = ssl._create_unverified_context()

            # 👉 Opravený rad s local_hostname
            self.connection = connection_class(
                self.host,
                self.port,
                local_hostname=getattr(self, 'local_hostname', None),
                timeout=self.timeout
            )
            self.connection.set_debuglevel(0)

            if self.use_tls:
                self.connection.starttls(context=context)
                self.connection.ehlo()

            if self.username and self.password:
                self.connection.login(self.username, self.password)

            return True
        except:
            if self.fail_silently:
                return False
            raise
