
Imports BLL_GESTION
Imports DAL_GESTION

Public Class Global_asax
    Inherits HttpApplication

    Sub Application_Start(sender As Object, e As EventArgs)
        ' Se desencadena al iniciar la aplicación
        Dim ErrorMsj As String = ""

        BLL_Utilidades.SetCultureInfo()

        Try
            ENTIDADES_LogDisco.nombreApp = "WEB_GSGaulo"

            ClsConexion.CadenaHolcim = BLL_Utilidades.CadenaConexion("BDH.dataSource", "BDH.initialCatalog", "BDH.userId", "BDH.password")

            'If BLL_Biometrico.DEP_BIOMETRICO(ErrorMsj) Is Nothing Then
            '    BLL_Log.INS_LOG(OBJ_LogDisco.nombreApp, "Global.asax.vb", "Aplicaction_Start", ErrorMsj)
            'End If

        Catch ex As Exception
            BLL_Log.INS_LOG(OBJ_LogDisco.nombreApp, "Global.asax.vb", "Aplicaction_Start", ex.Message)
        End Try
    End Sub


End Class