import io.api.bloxy.core.impl.*
import io.api.bloxy.error.ParamException
import io.api.bloxy.executor.IHttpClient
import io.api.bloxy.executor.impl.HttpClient
import java.util.function.Supplier

class AxionBloxyApi @JvmOverloads constructor(key: String, supplier: Supplier<IHttpClient> = Supplier { HttpClient() }) {

    val address: AxionAddressApiProvider = AxionAddressApiProvider(supplier.get(), key)

    init {
        if (key.isBlank()) throw ParamException("API key can not be null or empty")
    }
}