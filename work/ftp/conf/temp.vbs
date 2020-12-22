Dim   MyIAccount
set   MyIAccount=CreateObject("IAccount.DeskEngine")
MyIAccount.SetManager "218.4.58.75","xxzx01","780272179111425770342092" 
Dim  bFlag 
bFlag = MyIAccount.CheckCertLogin() 
If bFlag Then
  Wscript.Echo  MyIAccount.UserID & "-",MyIAccount.DefaultUserName & "-",MyIAccount.Unit & "-",MyIAccount.Organize 
Else 
  Wscript.Echo  0
End If
