const { DefaultAzureCredential } = require("@azure/identity");
const { ComputeManagementClient } = require("@azure/arm-compute");
module.exports = async function (context, myTimer) {
    context.log('Start-VM Function Triggered.');
    // Azure VM Details
    const subscriptionId = "26f614c0-22f5-442c-b51d-8352ce46e0e7";
    const resourceGroupName = "rg-24-04-on-pulfer-tamiap";
    const vmName = "TimerApp4";
    // Authenticate with Azure
    const credential = new DefaultAzureCredential();
    const computeClient = new ComputeManagementClient(credential, subscriptionId);
    try {
        // Start the VM
        context.log(`Starting VM: ${vmName}`);
        await computeClient.virtualMachines.beginStartAndWait(resourceGroupName, vmName);
        context.log(`VM ${vmName} started successfully.`);
    } catch (error) {
        context.log.error(`Error starting VM: ${error.message}`);
    }
};
