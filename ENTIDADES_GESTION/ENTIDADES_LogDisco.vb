Public Class ENTIDADES_LogDisco

    Private Shared _Estado As Boolean
    Public Shared Property Estado() As Boolean
        Get
            Return _Estado
        End Get
        Set(ByVal value As Boolean)
            _Estado = value
        End Set
    End Property

    Private Shared _Patch As String
    Public Shared Property Patch() As String
        Get
            Return _Patch
        End Get
        Set(ByVal value As String)
            _Patch = value
        End Set
    End Property

    Private Shared _nombreApp As String
    Public Shared Property nombreApp() As String
        Get
            Return _nombreApp
        End Get
        Set(ByVal value As String)
            _nombreApp = value
        End Set
    End Property

    Private Shared _Raiz As String
    Public Shared Property DirectorioRaiz() As String
        Get
            Return _Raiz
        End Get
        Set(ByVal value As String)
            _Raiz = value
        End Set
    End Property
End Class
