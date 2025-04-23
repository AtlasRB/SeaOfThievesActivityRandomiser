let activities = {};

fetch(`activities.json`)
    .then(response => response.json())
    .then(data => {
        activities = data;
        renderCheckboxes();
    })

function renderCheckboxes() {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';
    
    for (const mainActivity in activities) {
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('main-activity');
    
        // Main checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = mainActivity;
        checkbox.name = "activity";
        checkbox.value = mainActivity;
        checkbox.checked = true;
    
        const label = document.createElement('label');
        label.htmlFor = mainActivity;
        label.innerText = mainActivity;
    
        mainDiv.appendChild(checkbox);
        mainDiv.appendChild(label);
    
        // Container for sub-activities
        const subContainer = document.createElement('div');
        subContainer.classList.add('sub-activities');
        subContainer.style.marginLeft = '20px';
        subContainer.style.display = 'block'; 
    
        // Add sub-activities as checkboxes
        const subActivities = activities[mainActivity][0];
        subActivities.forEach(sub => {
        const subCheckbox = document.createElement('input');
        subCheckbox.type = 'checkbox';
        subCheckbox.name = `sub-${mainActivity}`;
        subCheckbox.value = sub;
        subCheckbox.checked = true;
    
        const subLabel = document.createElement('label');
        subLabel.innerText = sub;
    
        subContainer.appendChild(subCheckbox);
        subContainer.appendChild(subLabel);
        subContainer.appendChild(document.createElement('br'));
        });
    
        checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            subContainer.style.display = 'block';
            subContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {cb.checked = true; cb.disabled = false});
        } else {
            subContainer.style.display = 'none';
            subContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
            cb.disabled = true;
            });
        }
        });
    
        mainDiv.appendChild(subContainer);
        activityList.appendChild(mainDiv);
    }
}
    
function randomizeActivity() {
    const selectedMain = [...document.querySelectorAll('input[name="activity"]:checked')]
                            .map(cb => cb.value);

    if (selectedMain.length === 0) {
        document.getElementById('result').innerText = "Please select at least one main activity!";
        return;
    }

    const main = selectedMain[Math.floor(Math.random() * selectedMain.length)];
    const selectedSubs = [...document.querySelectorAll(`input[name="sub-${main}"]:checked`)]
                            .map(cb => cb.value);

    let resultText = `Main: ${main}`;

    if (selectedSubs.length > 0) {
        const sub = selectedSubs[Math.floor(Math.random() * selectedSubs.length)];
        resultText += `\nSub: ${sub}`;
    }

    document.getElementById('result').innerText = resultText;
    console.log(main, activities[main]);
    const imgPath = activities[main][1];
    const imgEl   = document.getElementById('resultImg');
    if (imgPath) {
        imgEl.src = imgPath;
        imgEl.style.display = 'block';
    } else {
        imgEl.style.display = 'none';
    }
}