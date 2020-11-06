import io.api.bloxy.model.dto.token.Holder
import org.junit.Test

class AppTest {

    companion object {
        private const val ELIGIBLE_ADDRESS = "0x34caf8a630501a9e830e28a726386499178f6093"
        private const val INELIGIBLE_ADDRESS = "0x6fb4ede564447d82e40319c679cf9af7b2f6265a"
        private val ELIGIBLE_HOLDER = Holder(ELIGIBLE_ADDRESS," ","",55.0)
        private val INELIGIBLE_HOLDER = Holder(INELIGIBLE_ADDRESS," ","",55.0)
    }

    private val testClass = App()
    //AXN balance > Hex2T balance
    //Ending AXN balance > starting Axn balance

    @Test
    fun run() {
        testClass.execute()
    }

    @Test
    fun runWithTestAddresses() {
        val holders = listOf(ELIGIBLE_HOLDER, INELIGIBLE_HOLDER)
    }
}