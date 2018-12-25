Public Class ENTIDADES_Conexion
    Private Shared _cadena

    Public Shared Property Cadena
        Get
            Return _cadena
        End Get
        Set(value)
            _cadena = value
        End Set
    End Property

End Class
