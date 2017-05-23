


 var sendgridmail =  function (toEmail,mailsubject,mailcontent,callback){
    var helper = require('sendgrid').mail;
      var fromEmail = new helper.Email('j.ravi786@gmail.com');
      var toEmail = new helper.Email(toEmail);
      var subject = mailsubject;
      var content = new helper.Content('text/plain', mailcontent);
      var mail = new helper.Mail(fromEmail, subject, toEmail, content);


      var sg = require('sendgrid')('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');
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });

      sg.API(request, function (error, response) {
      if (error) {     
      callback(false)
      }      
       callback(true)

    });
  }
 var sparkpostmail = function (toEmail,mailsubject,mailcontent,callback){

          var SparkPost = require('sparkpost');
          var client = new SparkPost('d7a2f9a4e6500393c3dafac8959775a38335a53a');
        
          client.transmissions.send({
              options: {
                sandbox: true
              },
              content: {
                from: 'testing@sparkpostbox.com',
                subject: mailsubject,
                html:'<html><body><p>'+mailcontent +'</p></body></html>'
              },
              recipients: [
                {address: toEmail}
              ]
            })
            .then(data => {             
               callback(true)

            })
            .catch(err => {             
              callback(false)
            });

}

 module.exports.sendMail = function(toEmail,mailsubject,mailcontent){ 
       sendgridmail(toEmail,mailsubject,mailcontent,function(res){
         if(res){
          console.log('Mailed sending successful')
         }
         else{
                sparkpostmail(toEmail,mailsubject,mailcontent,function(res){
                    if(!res){
                  console.log('Mailed sending failed')
                 }
                })
            }
         })         
            
   
  }

