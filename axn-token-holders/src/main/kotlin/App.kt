import io.api.bloxy.core.impl.BloxyApi
import io.api.bloxy.model.dto.address.CoinBalance
import io.api.bloxy.model.dto.token.Holder
import java.io.File
import kotlin.coroutines.coroutineContext

class App {

    companion object {
        /*
        Nov 2 5:51 AM CST (jubbin announcement)
        Nov 3rd at 8:36 AM PST (end date of eligibility period)
         */

        const val EXPLOIT_DATE = "2020-11-2"
        const val END_DATE = "2020-11-3"
        const val API_KEY = ""
        const val HEX_CONTRACT_ADDRESS = "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39"
        const val HEX2T_CONTRACT_ADDRESS = "0xed1199093b1abd07a368dd1c0cdc77d8517ba2a0"
        const val AXION_CONTRACT_ADDRESS = "0xda4C5AEA122260e70616E979592735F12FE20499"
    }

    private val bloxyApi = BloxyApi(API_KEY)
    private val bloxyApiWithAxionExtensions = AxionBloxyApi(API_KEY)
    private val outPutFile = File("holdersTest.txt")

    fun execute() {
        println("Collecting holders...")
        val holders = bloxyApi.token.holders("0xda4C5AEA122260e70616E979592735F12FE20499", 5000)
        println("Current Holders: " + holders.size)

        val eligibleHolders = mutableListOf<Holder>()
        var count = 1;
        holders.forEach { holder ->
            println("Progress: " + count + "/" + holders.size)
            val exploitDateBalances = bloxyApiWithAxionExtensions.address.balance(holder.address, EXPLOIT_DATE).getAll()
            val endDateBalances = bloxyApiWithAxionExtensions.address.balance(holder.address, END_DATE).getAll()

            val exploitDateHexBalance = getTokenBalanceForBalances(exploitDateBalances, HEX_CONTRACT_ADDRESS)
            val exploitDateHex2TBalance = getTokenBalanceForBalances(exploitDateBalances, HEX2T_CONTRACT_ADDRESS)
            val exploitDateAXNBalance = getTokenBalanceForBalances(exploitDateBalances, AXION_CONTRACT_ADDRESS)

            val endDateAXNBalance = getTokenBalanceForBalances(endDateBalances, AXION_CONTRACT_ADDRESS)

            if (endDateAXNBalance.balance > (exploitDateHexBalance.balance + exploitDateHex2TBalance.sentAmount) ||
                endDateAXNBalance.balance > exploitDateAXNBalance.balance) {

                eligibleHolders.add(holder)
            }
            count++
        }

        println("Eligible Holders: " + eligibleHolders.size + "\n")
        eligibleHolders.forEach { holder ->
            outPutFile.appendText(holder.address + "," + holder.balance + ",\n")
        }
        println("Holders written to: " + outPutFile.absolutePath + "\n")
    }

    private fun getTokenBalanceForBalances(balances: List<CoinBalance>, contractAddress: String): CoinBalance {
        val filteredBalances = balances.filter { it.tokenAddress.toUpperCase() == contractAddress.toUpperCase() }
        return if (filteredBalances.isNotEmpty()) filteredBalances[0] else CoinBalance()
    }
}