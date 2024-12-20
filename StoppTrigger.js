
const { DefaultAzureCredential } = require("@azure/identity");
const { ComputeManagementClient } = require("@azure/arm-compute");
module.exports = async function (context, myTimer) {
    context.log('Stop-VM Function Triggered.');
    
    const subscriptionId = "26f614c0-22f5-442c-b51d-8352ce46e0e7";
    const resourceGroupName = "rg-24-04-on-pulfer-tamiap";
    const vmName = "TimerApp4";
    
    const credential = new DefaultAzureCredential();
    const computeClient = new ComputeManagementClient(credential, subscriptionId);
    try {
        
        context.log(`Stopping VM: ${vmName}`);
        await computeClient.virtualMachines.beginPowerOffAndWait(resourceGroupName, vmName);
        context.log(`VM ${vmName} stopped successfully.`);
    } catch (error) {
        context.log.error(`Error stopping VM: ${error.message}`);
    }
};
