import io.api.bloxy.core.impl.AddressApiProvider
import io.api.bloxy.core.impl.BasicProvider
import io.api.bloxy.executor.IHttpClient
import io.api.bloxy.model.dto.address.*
import org.jetbrains.annotations.NotNull
import java.time.LocalDate

class AxionAddressApiProvider internal constructor(client: IHttpClient, key: String) : BasicProvider(client, "address", key) {

    /**
     * @see io.api.bloxy.core.IAddressApi.balance
     */
    @NotNull
    fun balance(
        address: String,
        date: String
    ): Balance {
        return Balance(get("balance?address=${checkAddrRequired(address)}&date=${date}"))
    }
}