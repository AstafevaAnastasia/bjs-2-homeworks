//Задача № 1
function cachingDecoratorNew(func) {
  let cache = new Map();

  return function (...args) {
    const hash = md5(args);
    if (cache.has(hash)) {
      return `Из кеша: ${cache.get(hash)}`;
    }

    const result = func.apply(this, args);
    cache.set(hash, result);

    if (cache.size > 5) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return `Вычисляем: ${result}`;
  }
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  let callCount = 0;
  let allCount = 0;
  let isFirstCall = true;

  function wrapper(...args) {
    allCount++;
    
    if (isFirstCall) {
      // Первый вызов - выполняем сразу
      callCount++;
      func.apply(this, args);
      isFirstCall = false;
    } else {
      // Последующие вызовы - сбрасываем таймер и ставим новый
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        callCount++;
        func.apply(this, args);
        timeoutId = null;
      }, delay);
    }
  }

  Object.defineProperty(wrapper, 'count', {
    get: function() { 
      return callCount; 
    }
  });

  Object.defineProperty(wrapper, 'allCount', {
    get: function() { 
      return allCount; 
    }
  });

  return wrapper;
}