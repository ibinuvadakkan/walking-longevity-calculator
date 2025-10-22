document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const ageInput = document.getElementById('age');
    const activitySelect = document.getElementById('activity');
    const walkingSlider = document.getElementById('walking');
    const walkingValue = document.getElementById('walkingValue');
    const intensitySelect = document.getElementById('intensity');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    const yearsResult = document.getElementById('yearsResult');
    const currentLifespan = document.getElementById('currentLifespan');
    const newLifespan = document.getElementById('newLifespan');
    const extraTime = document.getElementById('extraTime');
    
    // Update slider value display in real-time
    walkingSlider.addEventListener('input', function() {
        walkingValue.textContent = `${this.value} min`;
    });
    
    // Calculate results when button is clicked
    calculateBtn.addEventListener('click', function() {
        const age = parseInt(ageInput.value);
        const activity = activitySelect.value;
        const walkingMinutes = parseInt(walkingSlider.value);
        const intensity = intensitySelect.value;
        
        // Validate age input
        if (age < 20 || age > 100 || isNaN(age)) {
            alert('Please enter a valid age between 20 and 100');
            return;
        }
        
        // Calculate longevity results
        const results = calculateLongevity(age, activity, walkingMinutes, intensity);
        
        // Display results
        displayResults(results);
    });
    
    // Calculate longevity based on user inputs
    function calculateLongevity(age, activity, walkingMinutes, intensity) {
        // Base lifespan estimates by activity level
        const baseLifespans = {
            inactive: 76,
            light: 78,
            moderate: 80,
            active: 82
        };
        
        // Calculate base lifespan
        let baseLifespan = baseLifespans[activity];
        
        // Calculate additional years based on walking
        let additionalYears = 0;
        
        if (walkingMinutes > 0) {
            // Base multiplier for intensity
            const intensityMultipliers = {
                light: 0.7,
                brisk: 1.0,
                fast: 1.2
            };
            
            // Calculate based on research:
            // - 160 min/day brisk walking = 5+ years
            // - 10 min/day light walking = 0.9-1.4 years
            const baseGain = (walkingMinutes / 160) * 5;
            additionalYears = baseGain * intensityMultipliers[intensity];
            
            // Adjust for activity level (less active gain more)
            const activityAdjustments = {
                inactive: 1.4,
                light: 1.2,
                moderate: 1.0,
                active: 0.8
            };
            
            additionalYears *= activityAdjustments[activity];
            
            // Cap the maximum gain
            additionalYears = Math.min(additionalYears, 11);
        }
        
        // Calculate final results
        const currentLifeExpectancy = baseLifespan;
        const newLifeExpectancy = baseLifespan + additionalYears;
        const yearsGained = newLifeExpectancy - currentLifeExpectancy;
        
        return {
            currentLifeExpectancy,
            newLifeExpectancy,
            yearsGained
        };
    }
    
    // Display calculated results
    function displayResults(results) {
        const { currentLifeExpectancy, newLifeExpectancy, yearsGained } = results;
        
        // Format and display results
        yearsResult.textContent = `${yearsGained.toFixed(1)} years`;
        currentLifespan.textContent = `${currentLifeExpectancy} years`;
        newLifespan.textContent = `${newLifeExpectancy.toFixed(1)} years`;
        extraTime.textContent = `${yearsGained.toFixed(1)} years`;
        
        // Show results with animation
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Initialize with a calculation on page load
    calculateBtn.click();
});
