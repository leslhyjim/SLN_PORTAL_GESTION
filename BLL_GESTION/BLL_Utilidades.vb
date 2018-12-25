Imports System.Configuration
Imports System.Globalization
Imports System.IO
Imports System.Net.Mail
Imports System.Text.RegularExpressions
Imports System.Web
Imports DAL_GSGaulo
Imports MimeTypes
Imports OBJ_GSGaulo
Imports Scripting

Public Class BLL_Utilidades

    Shared Function CadenaConexion(ByVal dataSource As String, ByVal initialCatalog As String, ByVal userId As String, ByVal password As String) As String
        dataSource = ConfigurationManager.AppSettings(dataSource)
        initialCatalog = ConfigurationManager.AppSettings(initialCatalog)
        userId = ConfigurationManager.AppSettings(userId)
        password = BLL_Crypto.DescifrarClave(ConfigurationManager.AppSettings(password), "GS_GAULO")
        'Dim CADENA As String = String.Format("Data Source={0};Initial Catalog={1};Persist Security Info=True;User ID={2};Password={3};Connection Timeout=90;", dataSource, initialCatalog, userId, password)
        Dim CADENA As String = "Data Source=DESKTOP-UF7HNHN\SQLEXPRESS;Initial Catalog=GSGAULO;Persist Security Info=True;User ID=sa;Password=leslhyjim13;Connection Timeout=90;" 'casa
        'Dim CADENA As String = "Data Source=J01SIS40SFN;Initial Catalog=GSHOLCIM;Persist Security Info=True;User ID=usredoc;Password=usredoc;Connection Timeout=90;" 'localhost
        Return CADENA
    End Function

    Shared Function DBNullToInt(ByVal cadena As Object) As Integer
        Return DAL_Utilidades.DBNullToInt(cadena)
    End Function

    Shared Function DBNullToInt64(ByVal cadena As Object) As Integer
        Return DAL_Utilidades.DBNullToInt64(cadena)
    End Function

    Shared Function DBNullToDecimal(ByVal cadena As Object) As Decimal
        Return DAL_Utilidades.DBNullToDecimal(cadena)
    End Function

    Shared Function DBNullToString(ByVal cadena As Object) As String
        Return DAL_Utilidades.DBNullToString(cadena)
    End Function
    Shared Function DBNullToDateTime(ByVal cadena As Object) As DateTime
        Return DAL_Utilidades.DBNullToDateTime(cadena)
    End Function
    Shared Function DBNullToDate(ByVal cadena As Object) As DateTime
        Return DAL_Utilidades.DBNullToDate(cadena)
    End Function
    Shared Function DBNullToTime(ByVal cadena As Object) As TimeSpan
        Return DAL_Utilidades.DBNullToTime(cadena)
    End Function

    Shared Function DBNullToNothingInt(ByVal cadena As Object) As Nullable(Of Integer)
        Return DAL_Utilidades.DBNullToNothingInt(cadena)
    End Function

    Shared Function NothingToTexto(ByVal cadena As String)
        If cadena Is Nothing Then
            Return ""
        Else
            Return cadena
        End If
    End Function

    Shared Sub IngresarLogTexto(ByVal cadena As String, ByVal nombreArchivo As String, Optional ByVal CurrentThreadId As String = "")
        Try
            If OBJ_LogDisco.Estado = True Then
                cadena = NothingToTexto(cadena)
                Dim hora As String = Now.Date.ToString("yyyy/MM/dd").Replace("/", "") & " " & Now.TimeOfDay.ToString
                Dim Ls_File As New FileSystemObject()
                If cadena <> "" Then
                    If CurrentThreadId.Trim <> "" Then
                        cadena = "[" & CurrentThreadId & "] " & cadena
                    End If
                    cadena = hora & " => " & cadena
                End If
                If nombreArchivo.Contains("Transacciones") Then
                    Dim cadSubCarpetas As String = nombreArchivo.Substring(0, nombreArchivo.LastIndexOf("\") + 1)
                    If System.IO.Directory.Exists(OBJ_LogDisco.Patch & cadSubCarpetas) = False Then
                        System.IO.Directory.CreateDirectory(OBJ_LogDisco.Patch & cadSubCarpetas)
                    End If
                End If
                Dim ArhivoLog As String = nombreArchivo & "_" & Now.Date.ToString("yyyy/MM/dd").Replace("/", "") & ".txt"
                Dim tst As TextStream = Ls_File.OpenTextFile(OBJ_LogDisco.Patch & ArhivoLog, IOMode.ForAppending, True)
                tst.WriteLine(cadena)
                tst.Close()
            End If
        Catch ex As Exception

        End Try
    End Sub

    Shared Sub Send_Email(ByVal asunto As String, ByVal body As String, ByVal destinatarios As String(), ByVal copias As String(), ByVal prioridad As MailPriority, ByRef mensaje As String)

        Dim miCorreo As New MailMessage
        Dim smtp As New SmtpClient

        miCorreo.From = New MailAddress("steven.sanchez@gurusoft.com.ec", "Holcim Ecuador - Alertas")
        miCorreo.Subject = asunto
        miCorreo.Body = body
        miCorreo.IsBodyHtml = True
        miCorreo.Priority = prioridad

        For Each item In destinatarios
            If item.Trim <> "" Then miCorreo.To.Add(item.Trim)
        Next

        For Each item In copias
            If item.Trim <> "" Then miCorreo.Bcc.Add(item.Trim)
        Next

        smtp.Host = "mail.gurusoft.com.ec"
        smtp.Port = 26
        smtp.EnableSsl = False
        smtp.Credentials = New System.Net.NetworkCredential("steven.sanchez@gurusoft.com.ec", "0923361810")

        smtp.Send(miCorreo)
    End Sub

    'SignalR
    Shared Sub stopDependency()
        DAL_Utilidades.stopDependency()
    End Sub

    Shared Sub SetCultureInfo()
        Dim forceDotCulture As CultureInfo
        forceDotCulture = CType(Threading.Thread.CurrentThread.CurrentCulture.Clone(), CultureInfo)
        forceDotCulture.NumberFormat.CurrencySymbol = "$"
        forceDotCulture.NumberFormat.NumberDecimalSeparator = ","
        forceDotCulture.NumberFormat.CurrencyDecimalSeparator = ","
        forceDotCulture.NumberFormat.NumberGroupSeparator = "."
        forceDotCulture.NumberFormat.CurrencyGroupSeparator = "."
        forceDotCulture.DateTimeFormat.ShortDatePattern = "yyyy-MM-dd"
        Threading.Thread.CurrentThread.CurrentCulture = forceDotCulture
    End Sub

    Public Sub descargar(ByVal path As String,
                         ByVal fake As String)

        Dim fs As Stream = Nothing

        Try
            Dim info As New FileInfo(path)

            If info.Exists Then
                fs = New FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read)

                Dim bufferSize As Integer = 2048576 'bytes
                Dim buffer As Byte() = New [Byte](bufferSize - 1) {}

                Dim toRead As Integer = fs.Length
                Dim len As Integer = 0

                HttpContext.Current.Response.Clear()
                HttpContext.Current.Response.ContentType = MimeTypeMap.GetMimeType(info.Extension.Replace(".", ""))
                HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" + fake)
                HttpContext.Current.Response.AddHeader("Content-Length", info.Length.ToString())

                While toRead > 0
                    'Verifica si cliente sigue conectado
                    If HttpContext.Current.Response.IsClientConnected Then
                        len = fs.Read(buffer, 0, bufferSize)
                        HttpContext.Current.Response.OutputStream.Write(buffer, 0, len)
                        HttpContext.Current.Response.Flush()
                        toRead = toRead - len
                    Else
                        toRead = -1
                    End If

                End While

            End If

            If fs IsNot Nothing Then
                fs.Close()
            End If
            'HttpContext.Current.Response.End()
            HttpContext.Current.Response.Close()

        Catch ex As Exception
            Throw New Exception(ex.Message)
        End Try

    End Sub

    Public Shared Function subirArchivo(ByVal archivo As OBJ_File, ByVal parametros As String, ByRef mensaje As String) As Object

        Dim directorio As String = BLL_Parametro.QRY_GETPARAMETRO(parametros, mensaje)

        If directorio IsNot Nothing Then
            If directorio <> "" Then
                If Not Directory.Exists(directorio) Then
                    Dim infodi As DirectoryInfo = Directory.CreateDirectory(directorio)
                    If Not infodi.Exists Then
                        Throw New Exception("Error, directorio para certificados competencia no fue creado.")
                    End If
                End If

            End If
        Else
            Throw New Exception("Error al consultar el directorio de certificados competencias." & vbCrLf & mensaje)
        End If

        directorio &= archivo.nombre

        Dim bytes = Convert.FromBase64String(archivo.contentAsBase64String)

        Using stream = New FileStream(directorio, FileMode.Create)
            stream.Write(bytes, 0, bytes.Length)
            stream.Flush()
        End Using

        If Not IO.File.Exists(directorio) Then
            Throw New Exception("Error, el archivo no se guardó, intente de nuevo.")
        Else
            Return True
        End If

    End Function
End Class
