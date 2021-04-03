using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using WebApplication5.Abstract;

namespace WebApplication5.Concrete
{
    public class EmailHelper : IEmailHelper
    {
        public void Send(string email, string subject, string body, List<string> cc)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress("vanvuong2610@gmail.com");
                mail.To.Add(email);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                if(cc != null && cc.Count() >0)
                {
                    foreach(var c in cc)
                    {
                        mail.CC.Add(c);
                    }
                }

                SmtpServer.Port = 587;
                //gmail app password
                SmtpServer.Credentials = new System.Net.NetworkCredential("vanvuong2610@gmail.com", "efhvkauwwoolirhu");
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}